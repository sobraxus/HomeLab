## Introduction to Local Area Networks

### Network Topologies
#### Star Topology
- Systems are connected via a central hub e.g. server, switch or hub. Has a high scalability.

![Alt text](https://github.com/sobraxus/HomeLab/blob/master/TryHackMe/PreSecurity/Network_Topologies/Star.png)

#### Bus Topology 
- Relies on single connection across the whole line of nodes. Prone to bottlenecks. 

![Alt text](https://github.com/sobraxus/HomeLab/blob/master/TryHackMe/PreSecurity/Network_Topologies/Bus.png)

#### Ring Topology
- Packets travel from one device to the next until they have reached their destination

![Alt text](https://github.com/sobraxus/HomeLab/blob/master/TryHackMe/PreSecurity/Network_Topologies/Ring.png)

#### Switch
- Dedicated device for direct routing the traffic to the intended destination rather than querying each possibility within the network

#### Router
- Used to connect different networks and pass data between them

### Subnetting
- Subnet is used to break a network into different sub networks
- Subnet mask is 32 bits
- Utilise IP addresses three different ways:
-- Identify Network Adddress - Start of the network
-- Identify Host Address - Device IP
-- Identify Default Gateway - Address of a device capable of route traffic to another network

![Alt text](https://github.com/sobraxus/HomeLab/blob/master/TryHackMe/PreSecurity/Network_Topologies/Subnetting.png)

### Address Resolultion Protocol (ARP)

#### What is it?
- ARP allows a device to associate the MAC address with an IP address on the network
- Each device on a network will keep a list of MAC addresses
- When devices want to communicate they will use ARP and query for the specific device using the MAC address for communication

#### How does it work?

- ARP request is sent - Message is broadcasted to all devices in the network
- The request asks if the device MAC matches the IP address
- If there is a record of this, ARP Reply is sent from that device to acknowledge this
- Reply contains that device MAC address

![Alt text](https://github.com/sobraxus/HomeLab/blob/master/TryHackMe/PreSecurity/Network_Topologies/ARP.png)

### Dynamic Host Configuration Protocol (DHCP)

- IP Address' can either be manually or automatically assigned
- To assign via DHCP, the following is carried out between client/server
-- DHCP Discover (Client) - Says client is new and requires IP address
-- DHCP Offer (Server) - Offers x.x.x.x address to client
-- DHCP Request (Client) - Accepts x.x.x.x address
-- DHCP Ack (Server) - Assigns x.x.x.x to client for x period (typically 24 hours)

![Alt text](https://github.com/sobraxus/HomeLab/blob/master/TryHackMe/PreSecurity/Network_Topologies/DHCP.png)




