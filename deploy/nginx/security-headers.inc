# Security headers. Included at server level by seo.conf, and again inside every
# location that sets its own add_header (nginx drops inherited add_header there).
# HSTS is set by the aaPanel vhost at server level, so it is not repeated here.
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header X-Frame-Options "SAMEORIGIN" always;
