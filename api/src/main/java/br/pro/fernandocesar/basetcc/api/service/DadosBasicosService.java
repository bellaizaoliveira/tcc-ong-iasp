package br.pro.fernandocesar.basetcc.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.pro.fernandocesar.basetcc.api.domain.DadosBasicos;
import br.pro.fernandocesar.basetcc.api.repository.DadosBasicosRepository;

import java.util.List;

@Service
public class DadosBasicosService {

    @Autowired
    private DadosBasicosRepository repository;

    public List<DadosBasicos> findByTabela(String tabela) {
        return repository.findByTabela(tabela);
    }
}

