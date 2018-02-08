;该命令判断一个字符串是否为对象
;命令版本号v1.2

to hair.object.p :name
hair.detect
if MEMBER? :name :hair_object_list [op "true]
op "false
end
bury "hair.object.p
