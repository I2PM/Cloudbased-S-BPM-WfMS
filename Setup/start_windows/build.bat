@echo off

echo ##########################################################
echo BUILD ALL MICROSERVICES AND SKIPPING ALL TESTS
echo ##########################################################

echo ##########################################################
echo DELETED all jar files in builds/
echo ##########################################################
cd ../../builds
del *.jar

echo ##########################################################
echo 1 BUILD JAR ConfigurationService
echo ##########################################################
cd ../ConfigurationService
call gradlew build -x test 

echo ##########################################################
echo 2 BUILD JAR ExternalCommunicator
echo ##########################################################

cd ../ExternalCommunicator
call gradlew build -x test 

echo ##########################################################
echo 3 BUILD JAR ModellingPlatform
echo ##########################################################

cd ../ModellingPlatform
call gradlew build -x test 

echo ##########################################################
echo 4 BUILD JAR ProcessEngine
echo ########################################################## & echo.

cd ../ProcessEngine
call gradlew build -x test 

echo ##########################################################
echo 5 BUILD JAR EventLogger
echo ########################################################## & echo.

cd ../EventLogger
call gradlew build -x test 

echo ##########################################################
echo 6 BUILD JAR Gateway
echo ########################################################## & echo.

cd ../Gateway
call gradlew build -x test 

echo ##########################################################
echo 7 BUILD JAR GUI
echo ########################################################## & echo.

cd ../GUI
call gradlew build -x test 

echo ##########################################################
echo 8 BUILD JAR ProcessModelStorage
echo ########################################################## & echo.

cd ../ProcessModelStorage
call gradlew build -x test 

echo ##########################################################
echo 9 BUILD JAR ProcessStore
echo ########################################################## & echo.

cd ../ProcessStore
call gradlew build -x test 

echo ##########################################################
echo 10 BUILD JAR ServiceDiscovery
echo ########################################################## & echo.

cd ../ServiceDiscovery
call gradlew build -x test 



echo ##########################################################
echo DELETED all JAR files in builds/ in order to move them.
echo ##########################################################
cd ../builds
del *.jar

echo ##########################################################
echo 1 Move ConfigurationService
echo ##########################################################
cd ../ConfigurationService
call gradlew help --task copyJarToBin 

echo ##########################################################
echo 2 Move ExternalCommunicator
echo ##########################################################

cd ../ExternalCommunicator
call gradlew help --task copyJarToBin 

echo ##########################################################
echo 3 Move ModellingPlatform
echo ##########################################################

cd ../ModellingPlatform
call gradlew help --task copyJarToBin 

echo ##########################################################
echo 4 Move ProcessEngine
echo ########################################################## & echo.

cd ../ProcessEngine
call gradlew help --task copyJarToBin

echo ##########################################################
echo 5 Move EventLogger
echo ########################################################## & echo.

cd ../EventLogger
call gradlew help --task copyJarToBin

echo ##########################################################
echo 6 Move Gateway
echo ########################################################## & echo.

cd ../Gateway
call gradlew help --task copyJarToBin

echo ##########################################################
echo 7 Move GUI
echo ########################################################## & echo.

cd ../GUI
call gradlew help --task copyJarToBin

echo ##########################################################
echo 8 Move ProcessModelStorage
echo ########################################################## & echo.

cd ../ProcessModelStorage
call gradlew help --task copyJarToBin

echo ##########################################################
echo 9 Move ProcessStore
echo ########################################################## & echo.

cd ../ProcessStore
call gradlew help --task copyJarToBin

echo ##########################################################
echo 10 Move ServiceDiscovery
echo ########################################################## & echo.

cd ../ServiceDiscovery
call gradlew help --task copyJarToBin


echo FINISHED BUILDING JARS AND MOVED THEM TO FOLDER BUILDS
echo ########################################################## & echo.

pause

