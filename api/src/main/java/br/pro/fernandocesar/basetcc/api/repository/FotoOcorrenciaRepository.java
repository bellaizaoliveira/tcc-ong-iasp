package br.pro.fernandocesar.basetcc.api.repository;

import br.pro.fernandocesar.basetcc.api.domain.FotoOcorrencia;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FotoOcorrenciaRepository extends CrudRepository<FotoOcorrencia, Long> {
    List<FotoOcorrencia> findByOcorrencia(int ocorrencia);
}
