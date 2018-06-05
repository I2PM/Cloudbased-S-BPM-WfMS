package at.fhjoanneum.ippr.gateway.api.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.stereotype.Component;

import at.fhjoanneum.ippr.commons.global.ServiceIdentifiers;

@Component
public class GatewayConfig {

  @Autowired
  private DiscoveryClient discoveryClient;

  public String getProcessModelStorageAddress() {
    return discoveryClient.getInstances(ServiceIdentifiers.PROCESS_MODEL_STORAGE).get(0).getUri()
        .toString() + "/";
  }

  public String getProcessEngineAddress() {
    return discoveryClient.getInstances(ServiceIdentifiers.PROCESS_ENGINE).get(0).getUri()
        .toString() + "/";
  }

  public String getProcessStoreAddress() {
    return discoveryClient.getInstances(ServiceIdentifiers.PROCESS_STORE).get(0).getUri().toString() + "/";
  }
}
