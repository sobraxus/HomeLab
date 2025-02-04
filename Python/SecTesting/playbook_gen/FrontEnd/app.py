from flask import Flask, render_template

app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/subnetcalc')
def subnetCalc():
    return render_template('subnet.html')
@app.route('/firewallrules')
def firewallRules():
    return render_template('firewall.html')
@app.route('/portfolio')
def Portfolio():
    return render_template('portfolio.html')

if __name__ == '__main__':
    app.run(debug=True)