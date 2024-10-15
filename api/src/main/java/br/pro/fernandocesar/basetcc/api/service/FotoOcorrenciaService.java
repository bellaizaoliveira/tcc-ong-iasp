package br.pro.fernandocesar.basetcc.api.service;

import br.pro.fernandocesar.basetcc.api.domain.FotoOcorrencia;
import br.pro.fernandocesar.basetcc.api.repository.FotoOcorrenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FotoOcorrenciaService {

    @Autowired
    private FotoOcorrenciaRepository repository;

    public List<FotoOcorrencia> findAll() {
        // Convertendo para List, já que findAll() retorna Iterable
        return (List<FotoOcorrencia>) repository.findAll();
    }

    public Optional<FotoOcorrencia> findById(Long id) {
        return repository.findById(id);
    }

    public FotoOcorrencia save(FotoOcorrencia fotoOcorrencia) {
        return repository.save(fotoOcorrencia);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<FotoOcorrencia> findByOcorrencia(int ocorrencia) {
        return repository.findByOcorrencia(ocorrencia);
    }
}
