# App Academy Projects

Merged old repo's together using:

```bash
# merge project A into subdirectory A
$ git remote add -f projA /path/to/projA
$ git merge -s ours --no-commit projA/master
$ git read-tree --prefix=subdirA/ -u projA/master
$ git add -A
$ git commit -m "merging projA into subdirA"
```
