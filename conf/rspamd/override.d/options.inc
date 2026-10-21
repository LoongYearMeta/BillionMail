# Only loopback is a trusted local network. The docker network is private, and
# external connections NATed through its gateway must still get SPF, DKIM, RBL
# and greylisting checks. Authenticated submissions are not affected.
local_addrs = ["127.0.0.0/8", "::1"];
