package at.fhjoanneum.ippr.communicator.persistence.entities.basic;

import java.io.Serializable;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.MapKey;

import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Maps;

import at.fhjoanneum.ippr.communicator.persistence.entities.datatypecomposer.DataTypeComposerImpl;
import at.fhjoanneum.ippr.communicator.persistence.entities.protocol.MessageProtocolImpl;
import at.fhjoanneum.ippr.communicator.persistence.objects.DataType;
import at.fhjoanneum.ippr.communicator.persistence.objects.basic.BasicConfiguration;
import at.fhjoanneum.ippr.communicator.persistence.objects.datatypecomposer.DataTypeComposer;
import at.fhjoanneum.ippr.communicator.persistence.objects.protocol.MessageProtocol;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class AbstractBasicConfiguration implements BasicConfiguration, Serializable {

  private static final long serialVersionUID = -7550233823589354342L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column
  private final String name;

  @ManyToOne
  private final MessageProtocolImpl messageProtocol;

  @ManyToMany
  @JoinTable(name = "basic_configuration_composer_map",
      joinColumns = {@JoinColumn(name = "abstract_basic_configuration_id")},
      inverseJoinColumns = {@JoinColumn(name = "composer_id")})
  @MapKey
  private Map<DataType, DataTypeComposerImpl> composer = Maps.newHashMap();

  protected AbstractBasicConfiguration(final String name,
      final Map<DataType, DataTypeComposerImpl> composer,
      final MessageProtocolImpl messageProtocol) {
    this.name = name;
    this.composer = composer;
    this.messageProtocol = messageProtocol;
  }

  @Override
  public Long getId() {
    return id;
  }

  @Override
  public String getName() {
    return name;
  }

  @Override
  public Map<DataType, DataTypeComposer> getDataTypeComposer() {
    return ImmutableMap.copyOf(composer);
  }

  @Override
  public MessageProtocol getMessageProtocol() {
    return messageProtocol;
  }

  @Override
  public String toString() {
    return "AbstractBasicConfiguration [id=" + id + ", name=" + name + "]";
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((id == null) ? 0 : id.hashCode());
    return result;
  }

  @Override
  public boolean equals(final Object obj) {
    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }
    if (getClass() != obj.getClass()) {
      return false;
    }
    final AbstractBasicConfiguration other = (AbstractBasicConfiguration) obj;
    if (id == null) {
      if (other.id != null) {
        return false;
      }
    } else if (!id.equals(other.id)) {
      return false;
    }
    return true;
  }
}
