package taskmanagementsystem.business.concrates;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import taskmanagementsystem.business.abstracts.RoleService;
import taskmanagementsystem.business.requests.CreateRoleRequest;
import taskmanagementsystem.business.responses.GetRoleResponse;
import taskmanagementsystem.dataAccess.abstracts.RoleRepository;
import taskmanagementsystem.entities.Role;
import taskmanagementsystem.utilities.mapper.ModelMapperService;

import java.util.List;

@Component
@AllArgsConstructor
public class RoleManager implements RoleService {
    private final RoleRepository roleRepository;
    private final ModelMapperService modelMapper;


    @Override
    public void add(CreateRoleRequest createRoleRequest) {
        Role role = this.modelMapper
                .forRequest()
                .map(createRoleRequest, Role.class);

        this.roleRepository.save(role);
    }

    @Override
    public GetRoleResponse getById(int id) {
        Role role = this.roleRepository.findById(id);
        if (role == null) {
            throw new RuntimeException("Role does not exist!");
        } else return this.modelMapper
                .forResponse()
                .map(role, GetRoleResponse.class);
    }

    @Override
    public List<GetRoleResponse> getAll() {
        List<Role> roles = this.roleRepository.findAll();
        if (roles.isEmpty()) {
            throw new RuntimeException("Role entity is empty");
        } else return roles.stream()
                .map(role -> this.modelMapper
                        .forResponse()
                        .map(role, GetRoleResponse.class))
                .toList();

    }

    @Override
    public GetRoleResponse getByRole(String role) {
        Role returnedRole = this.roleRepository.findByRole(role);
        if (returnedRole == null) {
            throw new RuntimeException("Role entity is empty");
        } else return this.modelMapper
                .forResponse()
                .map(returnedRole, GetRoleResponse.class);
    }


}
