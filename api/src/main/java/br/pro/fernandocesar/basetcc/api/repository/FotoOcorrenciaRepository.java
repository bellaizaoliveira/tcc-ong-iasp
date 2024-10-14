package br.pro.fernandocesar.basetcc.api.repository;

import br.pro.fernandocesar.basetcc.api.domain.FotoOcorrencia;
import br.pro.fernandocesar.basetcc.api.domain.Ocorrencia;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FotoOcorrenciaRepository extends CrudRepository<FotoOcorrencia, Long> {
	
    List<FotoOcorrencia> findByOcorrencia(Ocorrencia ocorrencia);
}
