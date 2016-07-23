---
layout: post
title: Functional-Oriented Strategy
category: Python, Design Strategies, Elm
---

Everytime I develop a new system, I am continuously asking myself whether I am programming "correctly."
I know this sounds vague, a correct approach to solving systems is subjective, but to me this means that other developers are able to reason about the system's structure and design choices.
Many developers throw around the idiom "ability to reason about." I recently watched a [talk](https://youtu.be/oYk8CKH7OhE) on the Elm language where its founder Evan Czaplicki described his design choices.
Unsurprisingly, the idiom "ability to reason about" was top of mind when he developed Elm. All developers (should) strive to make their code easy to reason about. Most developers have the intention of creating
easy to reason about code but it is inherently subjective. I am interested to hear what easy to reason about means to you.

When I first started developing in Python, I knew I was doing it all wrong. It took a while before I understood the usefulness of classes.
If I wanted something _like_ a class, I used a dictionary. If I wanted an array of unique items, I used a list rather than a set.
However, I continued to read other developer's design choices and I am continuously improving my craft.

I recently read the book _Fluent Python_ by Luciano Ramalho. This book is a great resource for all Python and non-Python devs. What resonated most was Chapter 6. _Design Patterns with First-Class Objects_.
When I develop in Python, I try to bring a functional programming approach to the programs that I build. In the section _Function-Oriented Strategy_ of this chapter, Luciano uses two classes, a named tuple, and three helper functions to represent a transaction.

```python
from collections import namedtuple

Customer = namedtuple('Customer', 'name fidelity')


class LineItem:

    def __init__(self, product, quantity, price):
        self.product = product
        self.quantity = quantity
        self.price = price

    def total(self):
        return self.price * self.quantity


class Order:  # the Context

    def __init__(self, customer, cart, promotion=None):
        self.customer = customer
        self.cart = list(cart)
        self.promotion = promotion

    def total(self):
        if not hasattr(self, '__total'):
            self.__total = sum(item.total() for item in self.cart)
        return self.__total

    def due(self):
        if self.promotion is None:
            discount = 0
        else:
            discount = self.promotion(self)
        return self.total() - discount

    def __repr__(self):
        fmt = '<Order total: {:.2f} due: {:.2f}>'
        return fmt.format(self.total(), self.due())


def fidelity_promo(order):
    """5% discount for customers with 1000 or more fidelity points"""
    return order.total() * .05 if order.customer.fidelity >= 1000 else 0


def bulk_item_promo(order):
    """10% discount for each LineItem with 20 or more units"""
    discount = 0
    for item in order.cart:
        if item.quantity >= 20:
            discount += item.total() * .1
    return discount


def large_order_promo(order):
    """7% discount for orders with 10 or more distinct items"""
    distinct_items = {item.product for item in order.cart}
    if len(distinct_items) >= 10:
        return order.total() * .07
    return 0
```

From a functional programming approach, I liked the design choice of using a namedtuple to represent a customer. For those unfamiliar with a Python namedtuple,
it is found in the collections library built into the core language. It is an immutable data structure that acts like a Python class. In other words, all attributes of the namedtuple are accessible using dot sytax. This data structure is similar to a Clojure or Elm record.

Moving on to the class, LineItem, one will notice that is has attributes that are instantiated using data, and a method that produces data about itself given its instance attributes. Notice that the object is not performing anything using its method, there are no side-effects. Instead, the method is used so that the class and its associated data can _realize_ a little bit more about itself using the data that is under its umbrella.
That was a lot to take in, but the point I am trying to make is that there is a reason why Luciano chose to separate the promo functions from the classes; the reason being he wanted to separate data from logic.

Once we have a representation of a customer, items to purchase, and a promotion, these ideas can be composed using a class to represent an order. The Order class takes the Cutomer named tuple, the LineItem class to represent items to purchase, and one of the promotional functions.
Just as a functional programmer would use higher-order functions to accept other functions as arguments, the Order class is a higher-order class that takes in other classes as attributes as well as a function attribute. This is a really elegant way to compose and represent these ideas - building up an object that is made of smaller parts rather than a top-down approach that is arguably easier to code but difficult to reason about.

After reading Luciano's example, I had to try to implement this design choice myself. I will leave a sample of my code below and I hope you will comment on whether I succeessfully emulated his idea. The snippet below is part of a larger ETL system. Please forgive me for not having docstrings. I will add these later when the system is complete.

Thanks for reading!

config_file.py

```python
import csv
import os


class ConfigFile(object):

    def __init__(self,
                 ingestion_filepath,
                 ConfigTable):
        """Configuration Class for representing a file to ingest into a MySQL database

        :param ingestion_filepath (str): full local filepath to the file to ingest
        :param ConfigTable (obj): configuration object representing the table to ingest the file into.
            :attr header (namedtuple): configuration namedtuple representing the fields of the table.
                :attr expected_header (str): name of expected header as it appears in the raw file
                :attr desired_header (str): name of the field as it should appear in the database.
                :attr data_type (str): name of data type for the field in MySQL
            :primary_keys (set): field names which are a subset of the desired headers to be primary keys of the table
            :final_table (str): table name
        """
        self.ingestion_filepath = ingestion_filepath
        self.ingestion_basepath = os.path.basename(ingestion_filepath)
        self.ConfigTable = ConfigTable

    def file_inspection(self, delimiter=','):
        """Inspect file by checking to make sure that the headers of the raw data match our expected headers"""
        with open(self.ingestion_filepath, 'r') as f:
            r = csv.reader(f, delimiter=delimiter)
            first_row = r.next()
            actual_header = [s.strip() for s in first_row]

        if actual_header != self.ConfigTable.expected_headers:
            actual_header_str = delimiter.join(actual_header)
            expected_header_str = delimiter.join(
                self.ConfigTable.expected_headers)
            msg = "Actual Header:\n{0}\nDoesn't Match Expected Header\n{1}\n"
            msg_format = msg.format(actual_header_str, expected_header_str)
            raise ValueError(msg_format)
        else:
            dos_ending = '\r\n'
            unix_ending = '\n'

            if dos_ending in first_row:
              self.line_terminator = dos_ending
            elif unix_ending in first_row:
              self.line_terminator = unix_ending
            else:
              raise ValueError(
                  "Cannot tell the line ending from file, %s" % self.ingestion_basepath)
      return True
```

config_sql.py

```python
PATH_PKG = os.path.dirname(os.path.realpath(__file__))
PATH_PYTHON = os.path.dirname(PATH_PKG)
PATH_SRC = os.path.dirname(PATH_PYTHON)
PATH_SQL = os.path.join(PATH_SRC, "sql")


class ConfigSql(object):

    def __init__(self,
                 execute_script,
                 state_table="state_table",
                 sql_directory=PATH_SQL,
                 sql_ingestion_script="ingestion_template.sql",
                 sql_state_create_select_script="state_create_select_template.sql",
                 sql_state_insert_script="state_insert_template.sql",
                 **sql_credentials):
        """Configuration class to represent the state of MySQL before ingestion occurs

        :param execute_script (fn): function to execute a sql file
        :param state_table (str): name of state table in database
        :param sql_directory (str): path to SQL query templates and related files
        :param sql_ingestion_script (str): name of sql ingestion template script to be filled in with parameters
        :param sql_state_create_select_script (str): name of sql state table creation and retrieval template to be filled in with parameters
        :param sql_state_insert_script (str): name of sql state insert template to insert file name into the state table after upload
        :parm sql_credentials (dict): credentials to access SQL db.
            :key db: db name
            :key host: host
            :key passwd: password
            :key user: user
            :key port: port
        """
        self.state_table = state_table
        self.execute_script = execute_script
        self.sql_credentials = sql_credentials
        self.sql_directory = sql_directory,
        self.sql_ingestion_script = sql_ingestion_script
        self.sql_state_create_select_script = sql_state_create_select_script
        self.state_insert_script = sql_state_insert_script
        self.sql_environment = Environment(loader=FileSystemLoader(sql_directory,
                                                                   trim_blocks=True))

    def _render_state_create_query(self):
        """Populate the sql_state_create_select_script with state table name"""
        self.formatted_state_create_query = self.sql_config.sql_environment.get_template(
            self.sql_config.sql_state_create_select_script).render(
                state_table=self.state_table)

    def retrieve_sql_state(self):
        """Execute formatted sql_state_create_select_script

        :return (list): sql files already ingested in the database
        """
        return self.execute_script(self, self._render_state_create_query)


def execute_query_file(Sql,
                       formatted_query_file,
                       fetch=True):
    """Execute query using proper credentials

    :param Sql (obj): obj containing SQL credentials
    :param formatted_query_file (str): path of file to execute
    :param fetch (bool | default True): fetch results upon query completion
    :return: sql results in a list of tuples
    """
    with SqlAccount(Sql.sql_credentials) as sql:
        return sql.execute_file(formatted_query_file, fetch=fetch)
```

config_ingestion.py

```python
import uuid


class ConfigIngestion(object):

    def __init__(self,
                 File,
                 Sql):
        self.Sql = Sql
        self.File = File
        """Ingestion configuration class that represents the file to ingest and the state of the SQL database

        :param File (obj): File object to ingest
        :param Sql (obj): Sql object representing the state of MySQL
        """

    def temp_table(self, prefix='', postfix=''):
        """Create a temporary table for ingestion"""
        rand_str = str(uuid.uuid()).replace('-', '_')
        template = "{pre}_{rand}{post}"
        self._temp_table = template.format(
            pre=prefix, rand=rand_str, post=postfix)

    def render_ingestion_query(self):
        """Populate the SQL template with appropriate attributes"""
        self.formatted_ingestion_query = self.Sql.sql_environment.get_template(
            self.Sql.sql_ingestion_script).render(obj=self)

    def render_state_insert_query(self):
        """Populate the state_insert_query script with appropriate attributes"""
        self.formatted_state_insert_query = self.Sql.sql_environment.get_template(
            self.Sql.sql_state_insert_script).render(obj=self)
```
