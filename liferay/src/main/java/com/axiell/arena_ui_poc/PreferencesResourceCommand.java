package com.axiell.arena_ui_poc;

import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONSerializer;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.portlet.JSONPortletResponseUtil;
import com.liferay.portal.kernel.portlet.bridges.mvc.BaseMVCResourceCommand;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCResourceCommand;
import org.osgi.service.component.annotations.Component;

import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;
import java.io.IOException;
import java.util.Map;

@Component(
        property = {
                "javax.portlet.name=" + ArenaUIPortletKeys.HEROES_PORTLET_NAME,
                "javax.portlet.name=" + ArenaUIPortletKeys.GITHUB_PORTLET_NAME,
                "javax.portlet.name=" + ArenaUIPortletKeys.TODO_PORTLET_NAME,
                "mvc.command.name=/arena-ui/preferences"
        },
        service = MVCResourceCommand.class
)
public class PreferencesResourceCommand extends BaseMVCResourceCommand {

    @Override
    protected void doServeResource(final ResourceRequest resourceRequest, final ResourceResponse resourceResponse) throws IOException {
        Map<String, String[]> preferences = resourceRequest.getPreferences().getMap();
        JSONSerializer jsonSerializer = JSONFactoryUtil.createJSONSerializer();
        JSONPortletResponseUtil.writeJSON(resourceRequest, resourceResponse, jsonSerializer.serializeDeep(preferences));
    }

    public static final Log LOGGER = LogFactoryUtil.getLog(AbstractArenaUIPortlet.class);
}