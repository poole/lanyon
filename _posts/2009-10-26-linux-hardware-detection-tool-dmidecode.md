---
layout: post
title: Linux Hardware Detection Tool Dmidecode
permalink: linux-hardware-detection-tool-dmidecode
redirect_from: "2009-10-26-linux-hardware-detection-tool-dmidecode/"
tags:
- linux
- dmidecode
---

Searching for a quick method of checking a systems memory type, I stumbled upon the dmidecode tool. Dmidecode was able to pull all of the memory information from my motherboard. Including open memory slots and values of the occupied ones.

The official description is..

> [Dmidecode](http://www.nongnu.org/dmidecode) reports information about your system's hardware as described in your system BIOS according to the [SMBIOS](http://www.dmtf.org/standards/smbios) / [DMI](http://www.dmtf.org/standards/dmi standard) standard \(see a [sample output](http://www.nongnu.org/dmidecode/sample/dmidecode.txt)). This information typically includes system manufacturer, model name, serial number, BIOS version, asset tag as well as a lot of other details of varying level of interest and reliability depending on the manufacturer. This will often include usage status for the CPU sockets, expansion slots (e.g. AGP, PCI, ISA) and memory module slots, and the list of I/O ports (e.g. serial, parallel, USB).

```
Usage: dmidecode [OPTIONS]

Options are:

-d, --dev-mem FILE     Read memory from device FILE (default: /dev/mem)
-h, --help             Display this help text and exit
-q, --quiet            Less verbose output
-s, --string KEYWORD   Only display the value of the given DMI string
-t, --type TYPE        Only display the entries of given type
-u, --dump             Do not decode the entries  
     --dump-bin FILE    Dump the DMI data to a binary file
     --from-dump FILE   Read the DMI data from a binary file
-V, --version          Display the version and exit 
```

dmidecode run without any options will dump everything it can determine from the Desktop Management Interface (dmi). The output can be limited to a specific dmi type.


```
DMI TYPES

       The SMBIOS specification defines the following DMI types:
       Type   Information
       ----------------------------------------
          0   BIOS
          1   System
          2   Base Board
          3   Chassis
          4   Processor
          5   Memory Controller
          6   Memory Module
          7   Cache
          8   Port Connector
          9   System Slots
         10   On Board Devices
         11   OEM Strings
         12   System Configuration Options
         13   BIOS Language
         14   Group Associations
         15   System Event Log
         16   Physical Memory Array
         17   Memory Device
         18   32-bit Memory Error
         19   Memory Array Mapped Address
         20   Memory Device Mapped Address
         21   Built-in Pointing Device
         22   Portable Battery
         23   System Reset
         24   Hardware Security
         25   System Power Controls
         26   Voltage Probe
         27   Cooling Device
         28   Temperature Probe
         29   Electrical Current Probe
         30   Out-of-band Remote Access
         31   Boot Integrity Services
         32   System Boot
         33   64-bit Memory Error
         34   Management Device
         35   Management Device Component
         36   Management Device Threshold Data
         37   Memory Channel
         38   IPMI Device
         39   Power Supply
         40   Additional Information
         41   Onboard Device
```

Using the **-t** option, I have queried the dmi for type **"17"** **"Memory Device"**.

```
$ sudo dmidecode -t 17
# dmidecode 2.10
SMBIOS 2.3 present.

Handle 0x0028, DMI type 17, 23 bytes
Memory Device
Array Handle: 0x0026
Error Information Handle: 0x0025
Total Width: 16 bits
Data Width: 16 bits
Size: 128 MB
Form Factor: RIMM
Set: 3
Locator: J7J1
Bank Locator: RIMM1
Type: Other
Type Detail: RAMBus
Speed: 400 MHz

Handle 0x002A, DMI type 17, 23 bytes
Memory Device
Array Handle: 0x0026
Error Information Handle: 0x0025
Total Width: 16 bits
Data Width: 16 bits
Size: 128 MB
Form Factor: RIMM
Set: 3
Locator: J7J2
Bank Locator: RIMM2
Type: Other
Type Detail: RAMBus
Speed: 400 MHz

Handle 0x002C, DMI type 17, 23 bytes
Memory Device
Array Handle: 0x0026
Error Information Handle: 0x0025
Total Width: 16 bits
Data Width: 16 bits
Size: 128 MB
Form Factor: RIMM
Set: 3
Locator: J8J1
Bank Locator: RIMM3
Type: Other
Type Detail: RAMBus
Speed: 400 MHz
Handle 0x002E, DMI type 17, 23 bytes
Memory Device
Array Handle: 0x0026
Error Information Handle: 0x0025
Total Width: 16 bits
Data Width: 16 bits
Size: 128 MB
Form Factor: RIMM
Set: 3
Locator: J8J2
Bank Locator: RIMM4
Type: Other
Type Detail: RAMBus
Speed: 400 MHz
```

