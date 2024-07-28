## Packets and Frames

### What are Packets

- Both packets and frames are small pieces of data
- These make up a larger piece of data
- Frames are on layer 2 of the OSI model
- Frames contain no information like IP addresses

#### Notable Headers
- Time to live (TTL) Expiry timer for packet
- Checksum: Integrity checking for protocols
- Src Addr: IP address packet is sent from
- Dst Addr: IP address packet is sent to

### Three Way Handshake (TCP/IP)

- Consists of four layers
-- Application
-- Transport
-- Internet
-- Network interface
- Simlarly to OSI data is added in each layer (Encapsulation)
- TCP must establish a connection hence three way handshake

#### TCP Packets contain following in headers:
- Source Port	
- Destination Port	
- Source IP
- Destination IP
- Sequence Number
- Acknowledgement Number
- Chekcsum
- Data
- Flag

#### Three Way Handshake process terms
- SYN: Initial packet to initialise connection
- SYN/ACK: Packet sent by receiving device to acknowledge synchronization attempt
- ACK: Used by eithr client or server to acknowledge message or packet has been received
- DATA: Once established data will be sent e.g. bytes of a file
- FIN
- RST

### UDP/IP

### Port Numbers
