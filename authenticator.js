var cr = require('crypto')
var reg = /\/(\d+?)\/(\w+)\/(.*)/
var secure_key = "yoursecurekey"
var b = Buffer.from(secure_key.toUTF8().slice(0,4))
var mask = ((b[0] << 24) | (b[1] << 16) | (b[2] << 8) | b[3])
function authenticate(r) {
        var uri = r.uri
        var m = uri.match(reg)
        if(m.length != 4){
            return "0";
        }
        var hashval = cr.createHash('md5').update(secure_key + m[1] + m[3]).digest("hex").substr(0,30);
        if (hashval != m[2]){
            return "0";
        }
        var now = Date.parse(new Date())/1000;
        var expires = parse_expires(m[1]);
        if (expires - now < 0){
            return "0";
        }
        r.headersOut["Expires-In"] = (expires - now) + "s"
        return "1"
}
function parse_expires(e){
    var ee = parseInt(e)
    return ee ^ mask
}
export default { authenticate };
