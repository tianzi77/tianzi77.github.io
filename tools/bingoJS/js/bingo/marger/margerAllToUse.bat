
call margerAll.bat

cd build

xcopy bingo.js ..\..\..\..\help1.1\scripts  /Y
xcopy bingo-vsdoc.js ..\..\..\..\help1.1\scripts /Y

xcopy bingo.js ..\..\..\..\demo\scripts  /Y
xcopy bingo-vsdoc.js ..\..\..\..\demo\scripts /Y

xcopy bingo.js ..\..\..\..\demo\bootstrap\bingojs  /Y
xcopy bingo-vsdoc.js ..\..\..\..\demo\bootstrap\bingojs /Y

xcopy bingo.js ..\..\..\..\jasmine\src /Y

rem d:\Projects\Iaas\PS\bingoJS\demo\bootstrap\

del /q *.*

cd ..

pause