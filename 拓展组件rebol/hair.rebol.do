;提示为不成熟的指令
;执行rebol/core指令
;参数配置core还是view
;命令版本号v1.3

to hair.rebol.do :command [:rebol "rebol_core]
hair.detect
new "rebol_file "file
chdir :hair_res
.name.val "rebol_temp.htxt
.create
.writepr [rebol []]
.writepr :command
ignore shell se :rebol [rebol_temp.htxt]
popdir
hair.object.destroy "rebol_file
end
bury "hair.rebol.do
