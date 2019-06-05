package at.fhjoanneum.ippr.pmstorage.repositories;

import at.fhjoanneum.ippr.persistence.entities.model.payasyougo.PayAsYouGoImpl;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PayAsYouGoRepository extends PagingAndSortingRepository<PayAsYouGoImpl, Long> {

  /*
  @Modifying
  @Query(value = "INSERT INTO pay_as_you_go p (p.pi_id, p.process_name, p.org_id, p.datetime_start, p.rate) " +
          "VALUES (:pi_id, :process_name, :org_id, :datetime_start, :rate)" , nativeQuery = true)
  public int insertNewPayAsYouGoEntry(@Param("pi_id") Long pi_id,
                                             @Param("process_name") String process_name,
                                             @Param("org_id") Long org_id,
                                             @Param("datetime_start") LocalDateTime datetime_start,
                                             @Param("rate") Float rate);*/

  @Modifying
  @Query(value = "UPDATE pay_as_you_go p SET p.datetime_end = :datetime_end, p.duration = SEC_TO_TIME(TIMESTAMPDIFF(SECOND, p.datetime_start, :datetime_end)), p.total_cost = TIMESTAMPDIFF(MINUTE, p.datetime_start, :datetime_end) * p.rate WHERE p.pi_id = :pi_id", nativeQuery = true)
  public int updatePayAsYouGoByPiId(@Param("datetime_end") LocalDateTime datetime_end,
                                               @Param("pi_id") Long pi_id);


  @Query(value = "SELECT * FROM pay_as_you_go p WHERE p.org_id = :org_id", nativeQuery = true)
  public List<PayAsYouGoImpl> findPayAsYouGoByOrgId(@Param("org_id") int org_id);

}
