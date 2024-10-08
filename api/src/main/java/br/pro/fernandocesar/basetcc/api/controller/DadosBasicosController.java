package br.pro.fernandocesar.basetcc.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.pro.fernandocesar.basetcc.api.domain.DadosBasicos;
import br.pro.fernandocesar.basetcc.api.service.DadosBasicosService;

import java.util.List;

@RestController
@RequestMapping("/dadosbasicos")
public class DadosBasicosController {

    @Autowired
    private DadosBasicosService service;

    @GetMapping("/{tabela}")
    public List<DadosBasicos> getTabela(@PathVariable String tabela) {
        return service.findByTabela(tabela);
    }
}
