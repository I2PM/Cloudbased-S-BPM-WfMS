#!/usr/bin/env bash
echo starting EBUSA2017 on UNIX
echo ======================================
echo checking OS ...

OS='unknown'
UNAMESTR=`uname`

if [ $UNAMESTR=='Linux' ]; then
    OS='linux'
    echo Linux detected ...
elif [ "$UNAMESTR"=='Darwin' ]; then
    OS='mac'
    echo Mac detected ...
else
    echo No supported UNIX system detected
fi
echo ======================================

# start on Linux // tested with Ubuntu 17.10 running X11/Gnome
if [ "$OS"=='linux' ]; then
    echo
    echo starting services
    echo ======================================
    echo - ServiceDiscovery
    x-terminal-emulator -e bash ../../ServiceDiscovery/gradlew bootRun
    echo - ConfigurationService
    x-terminal-emulator -e bash ../../ConfigurationService/gradlew bootRun
    echo - ProcessModelStorage
    x-terminal-emulator -e bash ../../ProcessModelStorage/gradlew bootRun
    echo - ProcessEngine
    x-terminal-emulator -e bash ../../ProcessEngine/gradlew bootRun
    echo - Gateway
    x-terminal-emulator -e bash ../../Gateway/gradlew bootRun
    echo - ExternalCommunicator
    x-terminal-emulator -e bash ../../ExternalCommunicator/gradlew bootRun
    echo - EventLogger
    x-terminal-emulator -e bash ../../EventLogger/gradlew bootRun
    echo - GUI
    x-terminal-emulator -e bash ../../GUI/gradlew bootRun


# TODO: Modify cmds for starting services in new terminals
# start on MAC
elif [ "$OS"=='mac' ]; then
    echo
    echo starting services
    echo ======================================
    echo - ServiceDiscovery
    #TODO -e bash ../../ServiceDiscovery/gradlew bootRun
    echo - ConfigurationService
    #TODO -e bash ../../ConfigurationService/gradlew bootRun
    #echo - ProcessModelStorage
    #TODO -e ./../../ProcessModelStorage/gradlew bootRun
    echo - ProcessEngine
    #TODO -e bash ../../ProcessEngine/gradlew bootRun
    echo - Gateway
    #TODO -e bash ../../Gateway/gradlew bootRun
    echo - ExternalCommunicator
    #TODO -e bash ../../ExternalCommunicator/gradlew bootRun
    echo - EventLogger
    #TODO -e bash ../../EventLogger/gradlew bootRun
    echo - GUI
    #TODO -e bash ../../GUI/gradlew bootRun

else
    echo Process stopped!
fi

wait
