import click
import hashlib
import time
import re

secure_key = 'yoursecurekey'

b = [int(x) for x in secure_key.encode()[:4]]
mask = ((b[0] << 24) | (b[1] << 16) | (b[2] << 8) | b[3])


pattern = re.compile(r'^(\d+)(d|h|m)$')
def parse_duration(e):
    g = pattern.search(e)
    if g:
        d,u = g.groups()
        if u == 'm':
            return int(d)
        if u == 'h':
            return int(d) * 60
        if u == 'd':
            return int(d) * 60 * 24
    return 60


@click.command()
@click.option("-e",default="1h",help="expires duration. eg: 9m/5h/1d")
@click.option("-f",help="the file path base to alias or root directive value. eg: foo/bar.txt")
def main(e,f):
    if not f:
        print("the parameter f can not be null")
        return
    now = int(time.time())
    e = parse_duration(e)
    expires = now + (e * 60)
    masked_expires = str(expires ^ mask)
    s = secure_key + masked_expires + f
    hasher = hashlib.md5()
    hasher.update(s.encode())
    hashval = hasher.hexdigest()[:30]
    link = 'http://<YOURHOST>/{}/{}/{}'.format(masked_expires,hashval,f)
    print(link)

if __name__ == '__main__':
    main()