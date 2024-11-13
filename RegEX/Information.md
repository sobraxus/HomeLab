/t REGEX

/h1 What is RegEx?
Regex allows you to search for patterns within text or logs if it it hard to find manually or with a simple search.

![Alt text](https://www.regex101.com/)
![Alt text](https://www.regular-expressions.info/)

Splunk:

Splunk uses both rex and regex

rex:
rex [field=<field>] (<regex-expression> [max_match=<int>] [offset_field=<string>]) | (mode=sed <sed-expression>)

Example Rex: 
sourcetype=stream:http | rex field=event_logs "passwd"=(?<pass>[^&]+)"

Breakdown:
?<pass> - Specifies the name of the field captured value will be assigned to
[^&]+ - Matches any single character that is not ampersand. Plus sign ensures that it matches until it reaches an ampersand.
() - Signifies capture group

Regex:
regex (<field>=<regex-expression> | <field>!=<regex-expression> | <regex-expression>)

Example Regex:
sourcetype=suricata | src_ip="192\.168\.(224|225)\.\d{1,3}"
192\.168\. - Hardcoded network ranges
(224|225)\. - allows to alternate between 192.168.224 and 192.168.225
\d{1,3} - Finishes with any combination of digits 1-3 e.g. 192.168.225.60 as long as it is maximum 3 long.