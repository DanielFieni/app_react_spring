package com.danielProject.demo.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.danielProject.demo.entities.User;
import com.danielProject.demo.services.UserService;

// Identificar que os recursos web são implementados por um controlador
@RestController
// Defini uma rota padrão para o recurso
@RequestMapping(value = "/users")
public class UserResource {
	
	@Autowired
	private UserService service;
	
	// ResponseEntity - Retorna uma resposta da requisição web
	// Sinaliza que sera feito uma requisicao "GET"
	@GetMapping
	@CrossOrigin("http://localhost:5173/") // URL de origin (front end) de onde a url será chamada
	public ResponseEntity<List<User>> findAll()
	{
		List<User> list = service.findAll();
		return ResponseEntity.ok().body(list); // Retorna todos o usuarios do banco de dados
	}
	
	// Tambem sera feita uma requisicao "GET", no entanto o "id" do usuario e necessario para encontra-lo
	@GetMapping(value = "/{id}")
	@CrossOrigin("http://localhost:5173/")
	public ResponseEntity<User> findById(@PathVariable Long id)
	{
		User obj = service.findById(id);
		return ResponseEntity.ok().body(obj); // Retorna o usuario com o ID fornecido
	}
	
	// O metodo "POST", envia os parâmetros no corpo da requisicao
	@PostMapping
	@CrossOrigin("http://localhost:5173/")
	public ResponseEntity<User> insert(@RequestBody User obj) {
		obj = service.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	// O metodo "DELETE" ira deletar um usuario atraves do "id" passado no cabecalho da requisicao
	@DeleteMapping(value = "/{id}")
	@CrossOrigin("http://localhost:5173/")
	public ResponseEntity<Void> delete(@PathVariable Long id)
	{
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	// O metodo "PUT" ira atualizar um usuario atraves do "id" passado no cabecalho da requisicao
	@PutMapping(value = "/{id}")
	@CrossOrigin("http://localhost:5173/")
	public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User obj)
	{
		obj = service.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
	
}
