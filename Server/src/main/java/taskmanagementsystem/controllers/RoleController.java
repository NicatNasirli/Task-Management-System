package taskmanagementsystem.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import taskmanagementsystem.business.abstracts.RoleService;
import taskmanagementsystem.business.requests.CreateRoleRequest;
import taskmanagementsystem.business.responses.GetRoleResponse;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/role")
public class RoleController {
    private final RoleService roleService;

    @PostMapping()
    public void add(CreateRoleRequest createRoleRequest){
        this.roleService.add(createRoleRequest);
    }

    @GetMapping()
    public List<GetRoleResponse> getAll(){
        return this.roleService.getAll();
    }

    @GetMapping("/{id}")
    public GetRoleResponse getById(@PathVariable int id){
        return this.roleService.getById(id);
    }
}
