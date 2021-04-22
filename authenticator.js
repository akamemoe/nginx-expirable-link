var cr = require('crypto')
var reg = /\/(\d+)\/(\w+)\/(.*)/
var secure_key = "yoursecurekey"
var b = Buffer.from(secure_key.toUTF8().slice(0,4))
var mask = ((b[0] << 24) | (b[1] << 16) | (b[2] << 8) | b[3])
function authenticate(r) {
        var m = r.uri.match(reg)
        if(m.length != 4){
            return "0";
        }
        var hashval = cr.createHash('md5').update(secure_key + m[1] + m[3]).digest("hex").substr(0,30);
        if (hashval != m[2]){
            return "0";
        }
        
        var duration = parse_expires(m[1]);
        if (duration < 0){
            return "0";
        }
        r.headersOut["Expires-In"] = duration + "s"
        return "1"
}
function parse_expires(e){
    var ee = parseInt(e)
    var now = Date.parse(new Date())/1000;
    return (ee ^ mask) - now
}
export default { authenticate };
