import json
import sys

claim_ = ["id", "type", "status", "property_name", "date_created", "date_modified"]
agent_ = ["id", "name", "cell", "address"]
user_ = ["id", "password", "name", "claim_id", "agent_id"]

def write_table(table_type, table_elem, table_data):
    table_name = "sf-pcc-pcf-rsch-rdc-test-" + table_type
    res = {table_name:[]}
    for data in table_data:
        put_dict = {"PutRequest":{}}
        put_dict["PutRequest"] = {"Item": {}}
        item_dict = {}
        for property, elem in zip(table_elem, data):
            if isinstance(elem, list):
                item_dict[property] = {"SS": elem}
            else:
                item_dict[property] = {"S": elem}
        put_dict["PutRequest"]["Item"] = item_dict
        res[table_name].append(put_dict)
    return res

claims = [["0", "auto", "over", "ford", "05/22/1000", "05/22/2020"],
          ["1", "auto", "close", "ford", "05/22/1001", "05/22/2021"],
          ["2", "auto", "reopen", "audi", "05/22/1002", "05/22/2022"],
          ["3", "auto", "over", "toycar", "05/22/1003", "05/22/2023"],
          ["4", "auto", "close", "spongebob", "05/22/1004", "05/22/2024"]]

agents = [["0", "allen", "1234567891", "SomePlaceCool"],
          ["1", "bailey", "1212121212", "SomePlaceCooltoo"],
          ["2", "randoboi", "3434343434", "SomePlacebad"] ]

users = [["0", "hello123", "allen", ["0"], "0"],
         ["1", "hello124", "bailey", ["1", "3"], "1"],
         ["2", "hello125", "whatname", ["2", "4"], "2"]]

table_type = sys.argv[1]
with open(table_type + '.json', 'w') as jsonfile:
    if table_type == "agents":
        json.dump(write_table(table_type, agent_, agents), jsonfile, indent=4)
    elif table_type == "users":
        json.dump(write_table(table_type, user_, users), jsonfile, indent=4)
    elif table_type == "claims":
        json.dump(write_table(table_type, claim_, claims), jsonfile, indent=4)
