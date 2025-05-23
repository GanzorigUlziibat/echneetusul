from typing import final
from django.http.response import JsonResponse
from datetime import datetime
import pytz, json
from django.views.decorators.csrf import csrf_exempt
from backend.settings import sendResponse,connectDB, disconnectDB

def dt_getuser(request):
    jsons = json.loads(request.body)
    action = jsons['action']
    try:
        usermail = jsons['usermail']
    except:
        action = action
        respData = []
        resp = sendResponse(action, 1001, respData)
        return (resp)
    
    try:
        myConn = connectDB()
        cursor = myConn.cursor()
        query = f"SELECT uid, usermail, pwd, regdate, lastlogin FROM t_user WHERE usermail = '{usermail}'"
        cursor.execute(query)
        columns = cursor.description
        # print(columns)
        respRow = [{columns[index][0]:column for index , column in enumerate(value) } for value in cursor.fetchall()]
        print(respRow)
        
    except:
        action = action
        respData = []
        resp = sendResponse(action, 1008, respData)
    finally:
        cursor.close()
        disconnectDB(myConn)
        
    resp = sendResponse(action, 200, respRow)
    return resp

def dt_reguser(request):
    jsons = json.loads(request.body)
    action = jsons['action']
    try:
        usermail = jsons['usermail']
        pwd = jsons['pwd']
    except:
        action = action
        respData = []
        resp = sendResponse(action, 1002, respData)
        return (resp)
    
    try: 
        myConn = connectDB()
        cursor = myConn.cursor()
        query = f"SELECT COUNT(*) AS niit FROM t_user WHERE usermail = '{usermail}'"
        cursor.execute(query)
        columns = cursor.description
        # print(columns)
        respRow = [{columns[index][0]:column for index , column in enumerate(value) } for value in cursor.fetchall()]
        
        # print(respRow)
        if respRow[0]['niit'] == 0:
            query = f"INSERT INTO t_user(usermail, pwd, regdate,lastlogin) VALUES ('{usermail}', '{pwd}', NOW(),NOW())"
            cursor.execute(query)
            myConn.commit()
            respRow = [{"usermail":usermail}]
            resp = sendResponse(action, 1003, respRow)
        else: 
            action = action
            respData = [{"usermail":usermail}]
            resp = sendResponse(action, 1004, respData)
        
    except:
        action = action
        respData = []
        resp = sendResponse(action, 1008, respData)
    finally: 
        cursor.close()
        disconnectDB(myConn)
    
    
    return resp
    
def dt_loginuser(request):
    jsons = json.loads(request.body)
    action = jsons['action']
    try:
        usermail = jsons['usermail']
        pwd = jsons['pwd']
    except:
        action = action
        respData = []
        resp = sendResponse(action, 1005, respData)
        return (resp)
    
    myConn = connectDB()
    cursor = myConn.cursor()
    query = f"SELECT COUNT(*) AS niit, MIN(usermail) AS usermail, MIN(uid) AS uid, MIN(lastlogin) AS lastlogin FROM t_user WHERE usermail = '{usermail}' and pwd = '{pwd}'"
    cursor.execute(query)
    columns = cursor.description
    # print(columns)
    respRow = [{columns[index][0]:column for index , column in enumerate(value) } for value in cursor.fetchall()]
    print (respRow)
    if respRow[0]['niit'] == 1 :
        usermail = respRow[0]["usermail"]
        uid = respRow[0]["uid"]
        lastlogin = respRow[0]["lastlogin"]
        
        action = action
        respData = [{"usermail": usermail, "uid":uid, "lastlogin":lastlogin}]
        
        resp = sendResponse(action, 1006, respData)
    else:
        action = action
        respData = {"usermail": usermail}
        resp = sendResponse(action, 1007, respData)
    return resp
    
    
def dt_gethomepagedata(request):
    jsons = json.loads(request.body)
    action = jsons['action']
    
    myConn = connectDB()
    cursor = myConn.cursor()
    query = f"SELECT cid, catname_en, catname_mn FROM t_category"
    cursor.execute(query)
    columns = cursor.description
    # print(columns)
    respData = [{columns[index][0]:column for index , column in enumerate(value) } for value in cursor.fetchall()]
    
    for item in respData:
        print(item["cid"])
        query = f"SELECT scid, cid, subname_en, subname_mn FROM t_subcategory WHERE cid = {item['cid']}"
        cursor.execute(query)
        columns = cursor.description
        respRow = [{columns[index][0]:column for index , column in enumerate(value) } for value in cursor.fetchall()]
        item['subcat'] = respRow
        item['bagts'] = len(respRow)
    resp = sendResponse(action, 200, respData)
    
    return resp

def dt_getsubcatdata(request):
    jsons = json.loads(request.body)
    action = jsons['action']
    # try:
    #     usermail = jsons['usermail']
    #     pwd = jsons['pwd']
    # except:
    #     action = action
    #     respData = []
    #     resp = sendResponse(action, 1005, respData)
    #     return (resp)
    
    myConn = connectDB()
    cursor = myConn.cursor()
    query = f"SELECT cid, catname_en, catname_mn, catimg, catcolor FROM t_category"
    cursor.execute(query)
    columns = cursor.description
    # print(columns)
    respData = [{columns[index][0]:column for index , column in enumerate(value) } for value in cursor.fetchall()]
    
    for subcat in respData:
        # print(subcat['cid'])
        query = f"SELECT * FROM t_subcategory WHERE cid = {subcat['cid']}"
        cursor.execute(query)
        columns = cursor.description
        # print(columns)
        respRow = [{columns[index][0]:column for index , column in enumerate(value) } for value in cursor.fetchall()]
        subcat["subcat"] = respRow
        subcat["bagts"] = len(respRow)
        
    resp = sendResponse(action, 200, respData)
    return resp

def dt_getdata(request):
    jsons = json.loads(request.body)
    action = jsons['action']
    
    myConn = connectDB()
    cursor = myConn.cursor()
    query = f"""SELECT * FROM t_category"""
    cursor.execute(query)
    columns = cursor.description
    # print(columns)
    respData = [{columns[index][0]:column for index , column in enumerate(value) } for value in cursor.fetchall()]
    print (respData)
    for cat in respData:
        print(cat["cid"])
        cid = cat["cid"]
        query = f"""SELECT * FROM t_subcategory WHERE cid = {cid}"""
        cursor.execute(query)
        columns = cursor.description
        # print(columns)
        respRow = [{columns[index][0]:column for index , column in enumerate(value) } for value in cursor.fetchall()]
        cat["subcat"] = respRow
        cat["bagts"] = len(respRow)
    
    resp = sendResponse(action, 1006, respData)
    
    return resp

@csrf_exempt
def checkService(request):
    if request.method == "POST":
        try:
            jsons = json.loads( request.body)
        except: 
            action = "invalid request json"
            respData = []
            resp = sendResponse(action, 404, respData)
            return (JsonResponse(resp))
        # print(jsons)
        try: 
            action = jsons['action']
        except:
            action = "no action"
            respData = []
            resp = sendResponse(action, 400, respData)
            return (JsonResponse(resp))
        
        # print(action)
        if(action == 'getuser'):
            result = dt_getuser(request)
            return (JsonResponse(result))
        elif(action == 'reguser'):
            result = dt_reguser(request)
            return (JsonResponse(result))
        elif(action == 'loginuser'):
            result = dt_loginuser(request)
            return (JsonResponse(result))
        elif(action == 'gethomepagedata'):
            result = dt_gethomepagedata(request)
            return (JsonResponse(result))
        elif(action == 'getsubcatdata'):
            result = dt_getsubcatdata(request)
            return (JsonResponse(result))
        elif(action == 'getdata'):
            result = dt_getdata(request)
            return (JsonResponse(result))
       
        else:
            action = action
            respData = []
            resp = sendResponse(action, 406, respData)
            return (JsonResponse(resp))
    elif request.method == "GET":
        return (JsonResponse({}))
    else :
        return (JsonResponse({}))
