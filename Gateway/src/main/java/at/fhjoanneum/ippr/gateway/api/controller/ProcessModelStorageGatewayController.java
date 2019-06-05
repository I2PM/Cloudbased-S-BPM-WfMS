package at.fhjoanneum.ippr.gateway.api.controller;

import java.net.URISyntaxException;
import java.util.concurrent.Callable;

import javax.servlet.http.HttpServletRequest;

import at.fhjoanneum.ippr.commons.dto.payasyougo.PayAsYouGoDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import at.fhjoanneum.ippr.commons.dto.pmstorage.FieldPermissionDTO;
import at.fhjoanneum.ippr.commons.dto.pmstorage.FieldTypeDTO;
import at.fhjoanneum.ippr.commons.dto.pmstorage.ProcessModelDTO;
import at.fhjoanneum.ippr.gateway.api.controller.user.HttpHeaderUser;
import at.fhjoanneum.ippr.gateway.api.services.impl.ProcessModelStorageCallerImpl;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.text.ParseException;

@RestController
@RequestMapping(produces = "application/json; charset=UTF-8")
public class ProcessModelStorageGatewayController {

  private static final Logger LOG = LoggerFactory.getLogger(ProcessModelStorageGatewayController.class);

  @Autowired
  private ProcessModelStorageCallerImpl processModelStorageCaller;

  @RequestMapping(value = "api/processes", method = RequestMethod.GET)
  public @ResponseBody Callable<ResponseEntity<ProcessModelDTO[]>> findActiveProcesses(
      final HttpServletRequest request,
      @RequestParam(value = "page", required = true) final int page,
      @RequestParam(value = "size", required = false, defaultValue = "10") final int size) {
    return () -> {
      final HttpHeaderUser user = new HttpHeaderUser(request);
      return processModelStorageCaller.findActiveProcesses(user, page, size).get();
    };
  }

  @RequestMapping(value = "api/processes/toStart", method = RequestMethod.GET)
  public @ResponseBody Callable<ResponseEntity<ProcessModelDTO[]>> findActiveProcessesToStart(
      final HttpServletRequest request,
      @RequestParam(value = "page", required = true) final int page,
      @RequestParam(value = "size", required = false, defaultValue = "10") final int size) {
    return () -> {
      final HttpHeaderUser user = new HttpHeaderUser(request);
      return processModelStorageCaller.findActiveProcessesToStart(user, page, size).get();
    };
  }

  @Async
  @RequestMapping(value = "api/fieldtypes", method = RequestMethod.GET)
  public @ResponseBody Callable<ResponseEntity<FieldTypeDTO[]>> getFieldTypes(
      final HttpServletRequest request) {
    return () -> {
      return processModelStorageCaller.getFieldTypes().get();
    };
  }

  @RequestMapping(value = "api/permissions", method = RequestMethod.GET)
  public @ResponseBody Callable<ResponseEntity<FieldPermissionDTO[]>> getFieldPermissions(
      final HttpServletRequest request) {
    return () -> {
      return processModelStorageCaller.getPermissions().get();
    };
  }

  @RequestMapping(value = "api/processes/disable/{pmId}", method = RequestMethod.POST)
  public void disableProcessModel(@PathVariable("pmId") final Long pmId) {
    final Runnable runnable = () -> {
      try {
        processModelStorageCaller.disableProcessModel(pmId);
      } catch (final URISyntaxException e) {
        LOG.error(e.getMessage());
      }
    };
    runnable.run();
  }

  @RequestMapping(value = "api/processmodels", method = RequestMethod.GET)
  public @ResponseBody Callable<ResponseEntity<ProcessModelDTO[]>> findAllProcessModels(
      final HttpServletRequest request) {
    return () -> {
      return processModelStorageCaller.findAllProcessModels().get();
    };
  }

  @RequestMapping(value = "api/processes/payasyougo/addEntry/{processInstanceId}/with/{processName}/from/{orgId}/startedAt/{startTime}/and/{rate}", method = RequestMethod.POST)
  public void addPayAsYouGoEntry(@PathVariable("processInstanceId") final Long processInstanceId,
                                 @PathVariable("processName") final String processName,
                                 @PathVariable("orgId") final Long oId, @PathVariable("startTime") final Long startTime,
                                 @PathVariable("rate") final Long rate) {

    LOG.info("Serwus api/processes/payasyougo/addEntry/{processInstanceId}/with/{processName}/from/{orgId}/startedAt/{startTime} it is!");
    LOG.info("processInstanceId: " + processInstanceId);
    LOG.info("processName: " + processName);
    LOG.info("orgId: " + oId);
    LOG.info("startTime: " + startTime);
    LOG.info("rate:" + rate);

    final Runnable runnable = () -> {
      try {
        processModelStorageCaller.addPayAsYouGoEntry(processInstanceId, processName, oId, startTime, rate);
      } catch (final URISyntaxException e) {
        LOG.error(e.getMessage());
      }
    };
    runnable.run();
  }


  @RequestMapping(value = "api/processes/payasyougo/updateEntry/{processInstanceId}/with/{endTime}", method = RequestMethod.POST)
  public void addPayAsYouGoEntry(@PathVariable("processInstanceId") final Long processInstanceId,
                                 @PathVariable("endTime") final Long endTime) {

    LOG.info("Serwus api/processes/payasyougo/addEntry/{processInstanceId}/with/{processName}/from/{orgId}/startedAt/{startTime} it is!");
    LOG.info("processInstanceId: " + processInstanceId);
    LOG.info("endTime: " + endTime);

    final Runnable runnable = () -> {
      try {
        processModelStorageCaller.updatePayAsYouGoEntry(processInstanceId, endTime);
      } catch (final URISyntaxException e) {
        LOG.error(e.getMessage());
      }
    };
    runnable.run();
  }
	
  @RequestMapping(value = "api/processes/payasyougo/{org_id}", method = RequestMethod.GET)
  public @ResponseBody Callable<ResponseEntity<PayAsYouGoDTO[]>> findPayAsYouGo(
          final HttpServletRequest request,
          @PathVariable(name = "org_id") final int org_id) {
    return() -> processModelStorageCaller.findPayAsYouGo(org_id).get();
  }

}
