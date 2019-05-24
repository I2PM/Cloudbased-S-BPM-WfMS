package at.fhjoanneum.ippr.processstore.repositories;

import at.fhjoanneum.ippr.processstore.persistence.entities.ProcessOrgaMappingObjectImpl;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;



@Repository
public interface ProcessOrgaMapping extends CrudRepository<ProcessOrgaMappingObjectImpl, Long> {

    @Modifying
    @Query(value="UPDATE processorgamapping pom SET pom.process_model_id = :processModelId WHERE pom.process_store_id = :processStoreId AND pom.orga_id = :orgId", nativeQuery = true)
    public int mapProcessModelToProcess(@Param("processStoreId") Long processStoreId, @Param("processModelId") Long processModelId, @Param("orgId") Long orgId);
}
