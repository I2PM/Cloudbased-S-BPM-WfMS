package at.fhjoanneum.ippr.pmstorage.repositories;

import java.time.LocalDateTime;
import java.util.List;
import at.fhjoanneum.ippr.persistence.entities.model.process.ProcessModelImpl;
import at.fhjoanneum.ippr.persistence.entities.model.payasyougo.PayAsYouGoImpl;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcessModelRepository extends PagingAndSortingRepository<ProcessModelImpl, Long> {

  @Query(value = "SELECT p FROM PROCESS_MODEL p WHERE p.state = 'ACTIVE'")
  public List<ProcessModelImpl> findActiveProcesses();

  @Query(value = "SELECT pm.* , sender.subject_model_type " + "FROM subject_model_rule smr "
      + "JOIN subject_model sm ON sm.sm_id = smr.sm_id "
      + "JOIN process_model pm ON pm.starter_subject = sm.sm_id "
      + "JOIN state ON state.sm_id = sm.sm_id "
      + "LEFT JOIN message_flow mf ON mf.s_id = state.s_id "
      + "LEFT JOIN subject_model sender ON sender.sm_id = mf.sender "
      + "WHERE pm.state = 'ACTIVE' AND smr.name in :rules AND state.event_type = 'START' "
      + "AND sender.subject_model_type IS NULL", nativeQuery = true)
  public List<ProcessModelImpl> findActiveProcessesToStart(@Param("rules") List<String> rules);

  @Query(value = "SELECT * FROM process_model ORDER BY name ASC, version ASC", nativeQuery = true)
  public List<ProcessModelImpl> findAllOrderedByName();


  @Query(value = "INSERT INTO pay_as_you_go p (p.pi_id, p.process_name, p.org_id, p.datetime_start, p.rate) " +
          "VALUES (:pi_id, :process_name, :org_id, :datetime_start, :rate)" , nativeQuery = true)
  public PayAsYouGoImpl findPayAsYouGoByPiId(@Param("pi_id") int pi_id,
                                             @Param("process_name") String process_name,
                                             @Param("org_id") int org_id,
                                             @Param("datetime_start") LocalDateTime datetime_start,
                                             @Param("rate") Float rate);

  @Query(value = "UPDATE pay_as_you_go p SET p.datetime_end = :datetime_end, p.duration = SEC_TO_TIME(TIMESTAMPDIFF(SECOND, p.datetime_start, :datetime_end)), p.total_cost = TIMESTAMPDIFF(MINUTE, p.datetime_start, :datetime_end) * p.rate) WHERE p.pi_id = :pi_id", nativeQuery = true)
  public PayAsYouGoImpl updatePayAsYouGoByPiId(@Param("datetime_end") LocalDateTime datetime_end,
                                               @Param("pi_id") int pi_id);

  @Query(value = "SELECT * FROM pay_as_you_go p WHERE p.org_id = :org_id", nativeQuery = true)
  public List<PayAsYouGoImpl> findPayAsYouGoByOrgId(@Param("org_id") int org_id);

}
