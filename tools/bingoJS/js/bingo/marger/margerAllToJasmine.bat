
call margerAll.bat

cd build

xcopy bingo.js ..\..\..\..\jasmine\src /Y

del /q *.*

rem cd ..

rem pause