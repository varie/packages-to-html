Pre-assignment for junior developer position
=======

Description
-----------
On a Debian and Ubuntu systems, there is a file called /var/lib/dpkg/status that holds information about software packages that the system knows about. Write a small program in a programming language of your choice that exposes some key information about packages in the file via an HTML interface.

Insturctions
-----------
1. run get_packages.py to obtain packages infromation to data.json
2. start json-server: npx json-server --port 3001 --watch data/data.json
3. open index.html in browser


