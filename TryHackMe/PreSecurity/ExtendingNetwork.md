## Extending Networks to the Internet

### Port Forwarding
- Configured at the router
- Allows traffic through specific ports

### Firewalls
- Determines what traffic is allowed to enter and exit the network
- Perform packet inspection to answer following:
-- Where traffic is coming from - blocked network?
-- Where traffic is going - blocked network?
-- What port traffic is for - Port 80
-- What protocol is it using - TCP UDP
-- Operate on layers 3-4 of OSI TCP/UDP connections

#### Two primary categories
- Stateful
-- Uses entire information from connection rather than individual packet.
-- Dynamic decision making
-- Increased recourse usage

- Stateless
-- Uses static set of rules
-- If device sends bad packet, whole device won't necessarily be blocked
-- Only as effective as the rules implemented
-- Great at receiving a large amount of traffic from different hosts e.g. DOS attack

### Virtual Private Network (VPN)
- allows devices on different networks communicate securely
- Devices in this tunnel form their own private network

#### VPN Technologies
- PPP
-- Allows for thentication and provides encryption of data
-- Non Routable: Not cabable of leaving a network by itself

-PPTP
-- Point to Point Tunneling Protocol
-- Allows data to travel and leave a network
-- Easy to setup and supported by most devices
-- Weak encyrption in comparison to alternatives

- IPSec
-- Internet Protocol Security
-- Encrypts using IP Framework
-- Difficult to setup
-- Strong encryption
-- Supported on many devices

### LAN Networking Devices
#### What is a router?
- It's a routers job to connect networks and pass dat between them
- Creates a path between network
- Routers operate on Layer 3 of OSI
- Often feature an Interactive interface (website or console)
- Allows for configuration of port forwarding and firewalls

#### What is a switch?
- Dedicated network device
- facilitate devices 3-63 useing network cables
- Switches operate on both layer 2 and layer 3 of OSI
- Exclusive: Layer 2 cannot operate on layer 3 visversa
- Layer 2 solely responsible for sending traffic to correct device
- Layer 3 more sophisticated than layer 2
-- can perform some of the same operations as a router
-- create vlans to split up the network into segments