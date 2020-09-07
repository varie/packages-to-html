import re
import json
import unittest

with open('data/status.real', 'r') as f:
    data = f.readlines()

def parse_dependencies(depends: str) -> list:
    depends = re.sub(r' \(.+?\)', '', depends)
    depends_list = depends.split(',')
    depends_list = [item.strip() for item in depends_list]
    return list(set(depends_list))

packages = []
info = {}

description_flag: bool; description_flag = False

for line in data:
    if description_flag:
        if not line.startswith('Original-Maintainer') and not line.startswith('Homepage') and line != '\n':
            info['description'] += line
        else:
            description_flag = False
    if line == '\n':
        packages.append(info)
        info = {}
    else:
        if line.startswith('Package'):
            info['name'] = re.search(r'Package: ([-.\w]+)', line).group(1)
        if line.startswith('Description'):
            description_flag = True
            info['description'] = re.search(r'Description: ([-.,:+\"\'></\\)(}{\]\[\w\W]+)', line).group(1)
        if line.startswith('Depends'):
            depends = re.search(r'Depends: ([-\w,. ><=)(|:~]+)\n', line)
            if depends:
                depends = depends.group(1)
                info['depends'] = parse_dependencies(depends)

for package in packages:
    depends_on = []
    for package2 in packages:
        if 'depends' in package2 and package['name'] in package2['depends']:
            depends_on.append(package2['name'])
    if len(depends_on) > 0:
        package['depends_on'] = depends_on

sorted_packages = sorted(packages, key=lambda k: k['name']) 

dictionary = {}
dictionary['packages'] = sorted_packages

with open('data/data.json', 'w') as fp:
    json.dump(dictionary, fp, indent=4)


class Tests(unittest.TestCase):
      def test(self):
          self.assertEqual(parse_dependencies('python (>= 2.6), python (<< 2.8)'), ['python'])
          self.assertEqual(parse_dependencies(''), [''])


if __name__=='__main__':
      unittest.main()
