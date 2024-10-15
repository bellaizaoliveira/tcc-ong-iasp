package br.pro.fernandocesar.basetcc.api.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.pro.fernandocesar.basetcc.api.domain.Ocorrencia;

import br.pro.fernandocesar.basetcc.api.service.OcorrenciaService;

@RestController
@RequestMapping("/ocorrencias")
public class OcorrenciaController {
    @Autowired
    private OcorrenciaService ocorrenciaService;

    @GetMapping
    public List<Ocorrencia> listarOcorrencias() {
        return ocorrenciaService.listarOcorrencias();
    }

    @GetMapping("/{id}")
    public Optional<Ocorrencia> get(@PathVariable("id") Long id) {
        return ocorrenciaService.buscarOcorrenciaPorId(id);
    }

    // @GetMapping("/completa")
    // public List<Map<String, Object>> listarOcorrenciasCompleta() {
    // return ocorrenciaService.listarOcorrenciasCompleta();
    // }

    // @GetMapping("/completa")
    // public List<Map<String, Object>> listarOcorrenciasCompleta(
    // @RequestParam("dataInicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    // LocalDate dataInicio,
    // @RequestParam("dataFim") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    // LocalDate dataFim) {
    // return ocorrenciaService.listarOcorrenciasCompleta(dataInicio, dataFim);
    // }

    @GetMapping("/tipoocorrencia")
    public List<Map<String, Object>> obterTipoOcorrencia() {
        return ocorrenciaService.obterTipoOcorrencia();
    }

    @GetMapping("/completa")
    public List<Map<String, Object>> listarOcorrenciasCompleta(
            @RequestParam("dataInicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio,
            @RequestParam("dataFim") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim) {

        // Formatar as datas para YYYYMMDD
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String formattedDataInicio = dataInicio.format(formatter);
        String formattedDataFim = dataFim.format(formatter);

        // Chamar o serviço com as datas formatadas
        return ocorrenciaService.listarOcorrenciasCompleta(formattedDataInicio, formattedDataFim);
    }

    @PostMapping
    public Ocorrencia criarOcorrencia(@RequestBody Ocorrencia ocorrencia) {
        return ocorrenciaService.criarOcorrencia(ocorrencia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ocorrencia> atualizarOcorrencia(@PathVariable Long id, @RequestBody Ocorrencia ocorrencia) {
        if (ocorrenciaService.buscarOcorrenciaPorId(id).isPresent()) {
            Ocorrencia ocorrenciaAtualizado = ocorrenciaService.atualizarOcorrencia(id, ocorrencia);
            return ResponseEntity.ok(ocorrenciaAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
