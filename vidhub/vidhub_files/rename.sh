#!bash
for fname in `ls *.下载`
do
mv $fname ${fname/.下载/}
done