import { BlockConfiguration } from "@wordpress/blocks";
import { addFilter } from "@wordpress/hooks";
import InheritSidebar from "../instructions/blocks/InheritSidebar";

addFilter("register.block", "core", (blockConfiguration: BlockConfiguration) => {
    if (["core/image", "core/heading", "core/button"].includes(blockConfiguration.name)) {
        return;
    }
    const originalEdit = blockConfiguration.edit;
    blockConfiguration.edit = ({ clientId }) => {
        let component = originalEdit(...arguments);
        if (getParent(clientId).name === "yoast") {
            component = <Fragment>
                <InheritSidebar />
                {component}
            </Fragment>;
        }

        return component;
    }
})
