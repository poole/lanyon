Via [gnu.org](href="http://www.gnu.org/software/screen/)
>Screen is a full-screen window manager that multiplexes a physical terminal between several processes, typically interactive shells. Each virtual terminal provides the functions of the <a class="zem_slink" title="VT100" rel="wikipedia" href="http://en.wikipedia.org/wiki/VT100">DEC VT100</a> terminal and, in addition, several control functions from the <a class="zem_slink" title="ANSI escape code" rel="wikipedia" href="http://en.wikipedia.org/wiki/ANSI_escape_code">ANSI X3.64</a> (ISO 6429) and ISO 2022 standards (e.g., insert/delete line and support for multiple character sets). There is a scrollback history buffer for each virtual terminal and a copy-and-paste mechanism that allows the user to move text regions between windows. When screen is called, it creates a single window with a shell in it (or the specified command) and then gets out of your way so that you can use the program as you normally would. Then, at any time, you can create new (full-screen) windows with other programs in them (including more shells), kill the current window, view a list of the active windows, turn output logging on and off, copy text between windows, view the scrollback history, switch between windows, etc. All windows run their programs completely independent of each other. Programs continue to run when their window is currently not visible and even when the whole screen session is detached from the users terminal.

Screen will allow you to keep a persistent terminal session. Even when the connection is lost.
In the middle of compiling a new kernel when your network connection drops? No problem.. You were in a screen session right?

###Running Screen

Screen is simple enough to use.
To start a new session in a terminal

<pre>`screen`</pre>

Attach to an existing screen session

<pre>`screen -r`</pre>

Force reattach to an existing session

<pre>`screen -rd`</pre>

Share a screen session (multi display mode)

<pre>`screen -x`</pre>

###Basic Keyboard Commands

Here are some basics commands to help you get around.

The following table shows the default key bindings:

C- represents the ctrl key. The first command could be executed by pressing ctrl a followed by c

`C-a c`
`C-a C-c`
(screen)
Create a new window with a shell and switch to that window.

`C-a d`
`C-a C-d`
(detach)
Detach screen from this terminal.

`C-a D D`
(pow_detach)
Detach and logout.

`C-a k`
`C-a C-k`
(kill)
Destroy the current window.

`C-a`
`C-a n`
`C-a C-n`
(next)
Switch to the next window.

`C-a p`
`C-a C-p`
`C-a C-h`
`C-a`
(prev)
Switch to the previous window (opposite of C-a n).

`C-a x`
`C-a C-x`
(lockscreen)
Lock your terminal.

`C-a z`
`C-a C-z`
(suspend)
Suspend screen.

`C-a ?`
(help)
Show key bindings.

`C-a C-\`
(quit)
Kill all windows and terminate screen.

The commands above are just the basics. They will get the job done on their own. There are many more options available.
<a href="http://www.gnu.org/software/screen/manual/screen.html#Default-Key-Bindings">Default-Key-Bindings</a>

###Example .screenrc for a webserver:
 
<pre>`# basics
startup_message off
vbell           on
defscrollback   10000
autodetach      on

# status
hardstatus alwayslastline "%{= kw}%{g}[ %{R}%H %{g}] %{Y} %{g}[%=%{ =kw}%{w}%-w%{Y}[%{W}%n-%t%{Y}]%{w}%+w%=%{g}][ %{w}%m-%d %{Y}%c %{g}]"

# add caption
caption splitonly "%{= kw}%?%-Lw%?%{kw}%n*%t%f %?(%u)%?%{= kw}%?%+Lw%?"

screen -t shell 0 bash
screen -t vim 1 bash
screen -t htop 2 htop
screen -t apache 3 goaccess
screen -t log 4 tail -f -n 50 /var/log/apache2/error.log
screen -t log 5 tail -f -n 50 /var/log/messages
select 0`</pre> 


Additional Information on GNU Screen:

<a href="http://www.gnu.org/software/screen/">http://www.gnu.org/software/screen/</a>
<a href="http://www.gnu.org/software/screen/manual/">http://www.gnu.org/software/screen/manual/</a>
<a href="http://en.wikipedia.org/wiki/GNU_Screen">http://en.wikipedia.org/wiki/GNU_Screen</a>

