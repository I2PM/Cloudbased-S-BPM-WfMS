# Previous Projects
The information of previos information can be found at [Former ReadMe](https://github.com/I2PM/Cloudbased-S-BPM-WfMS/blob/master/Former_README.md).
# Start Project
Before starting the project, node, java, gradle and docker must be installed. Afterwards, go to the Setup/mysql_docker folder and type docker-compose up in a command line. In case you want to start all services as a docker container, see the instruction below. 
For normal setup, you have to consider that the GUI-dev could not be set as main GUI due to dependency problems. Therefore, for starting the application you have to outcomment the start of the GUI in /Setup/start_windows/start.bat. Then go to the GUI_dev folder, start a CMD and type "ng serve --watch". Afterwards, the GUI is available on Port 4200.
# S-BPM (Modelling), Execution and Store Platform
This is a (modelling), execution and store platform for S-BPM processes, based on microservices powered by Spring Boot. The modelling platform is based on Angular 1, the frontend for the execution and store platform, however, is based on Angular 2+. AIM18 improved the platform itself and connected the store and the execution Platform. Further Information can be found in the AIM18 Documentation Folder. That includes done Tasks, fulfilled User Stories and kown bugs.
Basically, the platform consists of the following modules:  
 - **ServiceDiscovery:** Automatic detection of devices and services.  
 - **ConfigurationService:** Central repository for configuration files.  
 - **ProcessModelStorage:** This is the process repository.  
 - **ProcessEngine:** Responsible for the execution of processes, based on Akka.  
 - **EventLogger:** Logs events during execution, exports logs in CSV format, manipulates PNML files and transforms manipulated PNML files to OWL files.  
 - **Gateway:** Authentication and authorization service and handles the requests of the process execution frontend (GUI).  
 - **Persistence:** Hibernate mapping of the database tables.  
 - **ExternalCommunicator:** For the support of external projects.  
 - **GUI-Dev:** Development project for the Angular 2 execution platform frontend (With some dev tools, with node server backend).  
 - **GUI:** Production project for the Angular 2 execution platform frontend (minified, uglified, with Spring Boot backend).  
 - **ModellingPlatform-Dev:** Development project for the Angular 1 modelling platform frontend (with node server backend).  
 - **ModellingPlatform:** Production project for the Angular 1 modelling platform frontend (with Spring Boot backend).
 > A new version of the S-BPM modelling platform is available [here](https://github.com/mkolodiy/s-bpm-modeler).
>
# Troubleshooting of GUI Start
In case GUI-dev won't start via "ng serve --watch", it coudl be one of those errors.
* Error mit ng:
   -> npm uninstall -g @angular/cli
   -> npm install -g @angular/cli@1.6.8

* Error mit Mixins:
  -> npm install node-sass@4.8.1

* Error "Module not found: Error: Can't resolve 'ng2-completer'":
  -> npm install ng2-completer

* Fehler beim Buildvorgang: Error error msb3428 could not load the visual c++ component vcbuild.exe. 
  -> PowerShell als Admin:  npm install -g --production windows-build-tools
# Deploying of Microservices to docker 
Dockerfiles are available in the build folder of the project. In order to guarantee the communication within the docker containers, all entries of localhost must be changed to the service names according to the docker-compose file. See the Cloud01-MOVE branch as an example. To create the jar of the DEV-Gui:
* Go to the GUI-Dev folder and run npm run build.
* Go to GUI/src/main/resources/public/ and remove of all of its content.
* Go to GUI-Dev/dist and move all of its content to GUI/src/main/resources/public/.
* Go to GUI and run gradlew build or gradlew run
