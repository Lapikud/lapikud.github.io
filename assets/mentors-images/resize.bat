@echo off
set "source_folder=\original"
set "result_folder_1=\optimised"

for %%a in ("%source_folder%\*jpg") do (
   call scale.bat -source "%%~fa" -target "%result_folder_1%\%%~nxa" -max-height 300 -max-width 300 -keep-ratio no -force yes
)
