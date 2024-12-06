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
        return this.modelMapper
                .forResponse()
                .map(this.roleRepository.findById(id), GetRoleResponse.class);
    }

    @Override
    public List<GetRoleResponse> getAll() {
        return this.roleRepository.findAll()
                .stream()
                .map(role -> this.modelMapper
                        .forResponse()
                        .map(role, GetRoleResponse.class))
                .toList();

    }

    @Override
    public GetRoleResponse getByRole(String role) {
        return this.modelMapper
                .forResponse()
                .map(this.roleRepository.findByRole(role), GetRoleResponse.class);
    }


}
