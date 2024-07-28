## Dynamic Naming Server in detail

### What is DNS

### Domain Heirarchy
#### Root Domain
#### Top Level Domain (TLD)
- Most right hand part of a domain name
- gTLD: .com (commercial) .org (organization) .edu (education) .gov (government)
- ccTLD: geographical .ca (canada) .co.uk (united kingdom)

#### Second-Level Domain
- www.TRYHACKME.com: tryhackme is the second level domain
- second level is limited to 63 characters

#### Subdomain
- admin.tryhackme.com for example

### Record Types

#### A Record
- A records resolve to IPv4 addresses e.g. 104.26.10.229

#### AAAA Record
- AAAA Records resolve to IPv6 addresses e.g. 2606:4700:20::681a:be5

#### Cononical Name (CNAME) Record
- CNAME records resolve to different domains
- Nickname for another domain
- Good example is a website 'store.x.com' which redirects to the true name 'shop.shopify.com' shop.x would then be used to query the IP for store.x


#### MX Record

- Resolve the adddress of servers that handle the email for the domain that is being queries
- MX Record example: alt1.aspmx.l.google.com
- Priority fag indicates which order to try servers. Helpful for if a server is down and a backup server needs to be used

#### TXT Record

- Free text fields used for any text data
- Used to list servers that have authority to sen email on bealf of the domain (Used to prevent spoofing and phishing attacks)
- Also used to veryify ownership, asset management when signing up for third party services.


### Making A Request
#### The five step process:
- Local computer cache is checked for the address
- Recursive DNS local cache is checked
- Root server redirects to TLD server.
- TLD server redirects to name server to resolve query
- Name server can update recursive cache and relay back to client
 
