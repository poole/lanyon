---
layout: post
title: Java 8 Type Safe Configuration with default methods
---

There is a common requirement in most of the Java/JavaEE projects related to how differentiate environment configurations like development, test, QA, production, etc. for that reason there are a lot of frameworks or libraries to resolve that:

* [DeltaSpike Configuration](https://deltaspike.apache.org/documentation/configuration.html)
* [Apache Commons Configuration](http://commons.apache.org/proper/commons-configuration/)
* [Sabot](https://github.com/tomitribe/sabot)
* [Apache Tamaya](http://tamaya.incubator.apache.org/)
* [Dropwizard Configuration](http://www.dropwizard.io/0.9.1/docs/getting-started.html#creating-a-configuration-class)
* [Jackson Dataformat YAML](https://github.com/FasterXML/jackson-dataformat-yaml)

**Even there is a Java Specification Request (JSR) Proposal:**

* [JSR Proposal](https://jcp.org/aboutJava/communityprocess/ec-public/materials/2014-09-2526/JavaSEConfigProposal.pdf)

## How those libraries resolve the problem
Most of those libraries require to have an injection point(s) for the configurations and also the configurations source(s), something like this:

`dev.properties`:

```properties
host=localhost
port=5432
schema=public
```

`prod.properties`:

```properties
host=production.com
port=5432
schema=public
```

`ConfigurationResolver.java`:

```java
class ConfigurationResolver implements SomeLibraryInterface {
  @Override
  public String resolvePropertyFilename() {
    // probably do some trick to load a global/base configuration
    // if is not provided for the library
    return String.format("%s.properties", System.getProperty("MY_ENV", "dev"));
  }
}
```

`MyType.java`:

```java
class MyType {
  @Configuration(key = "host")
  String host;
  @Configuration(key = "port")
  int port;
  @Configuration(key = "schema", defaultValue = "public")
  String schema;
}
```
> Notice that all the granularity is only needed because  lack of support for custom types

Besides that, with the new Java 8 capabilities, specifically with [default methods](https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html) and some utilities classes is easy to get this behavior.

## With Java 8 default methods

`DefaultConfiguration.java`:

```java
interface DefaultConfiguration {
  default DataSource datasource {
    // create the DS with host, port and schema
    return new MyDataSource("localhost", 5432, "public");
  }
}
```

`DevConfiguration.java`:

```java
class DevConfiguration implements DefaultConfiguration {
  // No need to override methods if they are the same
}
```

`ProdConfiguration`:

```java
class ProdConfiguration implements DefaultConfiguration {
  default DataSource datasource {
    return new MyDataSource("production.com", 5432, "public");
  }
}
```

`ConfigurationFactory.java`:

```java
abstract class ConfigurationFactory {
    private static final Map<String, DefaultConfiguration> configurations = new HashMap<>();

    static {
        configurations.put("development", new DevConfiguration());
        configurations.put("production", new ProdConfiguration());
    }

    public static DefaultConfiguration configuration() {
        return configurations.getOrDefault(System.getProperty("MY_ENV"), new DevConfiguration());
    }
}
```
> Notice that you can use an enumeration instead a map as a configuration factory.

## Pros

* Type safe configurations
* Support for all kind of types not only ```String```, ```Date``` or primitives. you can specify or example ```DataSource```, ```TimeUnits```, ```JedisPool```, etc.
* No conversion/mapping from strings to types
* No more ```.properties```, ```.xml``` or ```.yml``` files
* Possibility to use other sources to fill the properties like: properties files, database, rest api's, etc.
* No library/framework/dependency required in your app

## Cons

* Changes in the configuration requires compile/deploy (this shouldn't be a problem in the 99% of the cases)

[source code](https://github.com/cchacin/typesafe-configuration)
