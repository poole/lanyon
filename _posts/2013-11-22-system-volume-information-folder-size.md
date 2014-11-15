---
layout: post
title: System Volume Information folder size
---

Reduce the size of your System Volume Information folder by shrinking the shadow storage.

Use `vssadmin list shadowstorage` to list the current Shadow Copy Storage size.

```
C:\>vssadmin list shadowstorage
vssadmin 1.1 - Volume Shadow Copy Service administrative command-line tool
(C) Copyright 2001-2005 Microsoft Corp.

Shadow Copy Storage association
For volume: (C:)\\?\Volume{278ce142-19d8-11e1-9176-806e6f6e6963}\
Shadow Copy Storage volume: (C:)\\?\Volume{278ce142-19d8-11e1-9176-806e6f6e69
63}\
Used Shadow Copy Storage space: 15.681 GB (39%)
Allocated Shadow Copy Storage space: 16.152 GB (40%)
Maximum Shadow Copy Storage space: UNBOUNDED (100%)
```

In the example above there is no limit set on Maxium storage.
To set a limit use the `maxsize=` command. In Windows Server 2008+ this can be set as a percentage of disk space.

```
C:\>vssadmin resize shadowstorage /on=C: /For=C: /Maxsize=4GB
vssadmin 1.1 - Volume Shadow Copy Service administrative command-line tool
(C) Copyright 2001-2005 Microsoft Corp.

Successfully resized the shadow copy storage association
```

After setting `maxsize` rerun `list shadowstorage` to verify/review the updated configuration.

```
C:\>vssadmin list shadowstorage
vssadmin 1.1 - Volume Shadow Copy Service administrative command-line tool
(C) Copyright 2001-2005 Microsoft Corp.

Shadow Copy Storage association
For volume: (C:)\\?\Volume{278ce142-19d8-11e1-9176-806e6f6e6963}\
Shadow Copy Storage volume: (C:)\\?\Volume{278ce142-19d8-11e1-9176-806e6f6e6963}\
Used Shadow Copy Storage space: 2.81 GB (7%)
Allocated Shadow Copy Storage space: 3.279 GB (8%)
Maximum Shadow Copy Storage space: 4 GB (10%)
```
