;命令版本号1.2
;对外开放的debug工具
;dribble流，对象和类，重启，build
;待完善

to hair.debug.tool
 hair.detect
WINDOWCREATE "main "debugger "Hair开发者工具 0 0 120 300 []
STATICCREATE "debugger "objmessage [hair_obj_list] 25 10 70 10
listboxcreate "debugger "objlist 25 25 70 30
buttoncreate "debugger "tip "显示对象tip 40 55 40 10 [hair.debug.tool.repeat2]
STATICCREATE "debugger "classmessage [hair_obj_class] 25 75 70 10
listboxcreate "debugger "classlist 25 90 70 30
make "hair_debug_dribble 0
buttoncreate "debugger "dri "开启日志 25 200 70 20 [ifelse :hair_debug_dribble=0 [make "hair_debug_dribble 1 dribble "hair_dirbble.txt
  buttonupdate "dri "停止日志][make "hair_debug_dribble 0 nodribble buttonupdate "dri "开启日志 WINDOWFILEEDIT "hair_dirbble.txt []]]
buttoncreate "debugger "refresh "刷新 35 250 20 10 [hair.debug.tool.repeat]
buttoncreate "debugger "end "关闭 65 250 20 10 [windowdelete "debugger]
end
bury "hair.debug.tool
