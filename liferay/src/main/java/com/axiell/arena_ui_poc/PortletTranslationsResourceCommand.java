package com.axiell.arena_ui_poc;

import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONSerializer;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.module.configuration.ConfigurationException;
import com.liferay.portal.kernel.module.configuration.ConfigurationProviderUtil;
import com.liferay.portal.kernel.portlet.JSONPortletResponseUtil;
import com.liferay.portal.kernel.portlet.bridges.mvc.BaseMVCResourceCommand;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCResourceCommand;
import com.liferay.portal.kernel.theme.PortletDisplay;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.util.ParamUtil;
import com.liferay.portal.kernel.util.WebKeys;
import org.osgi.service.component.annotations.Component;

import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;
import java.io.IOException;
import java.util.*;

@Component(
        property = {
                "javax.portlet.name=" + ArenaUIPortletKeys.CALENDAR_PORTLET_NAME,
                "javax.portlet.name=" + ArenaUIPortletKeys.GITHUB_PORTLET_NAME,
                "javax.portlet.name=" + ArenaUIPortletKeys.TODO_PORTLET_NAME,
                "mvc.command.name=/translations"
        },
        service = MVCResourceCommand.class
)
public class PortletTranslationsResourceCommand extends BaseMVCResourceCommand {

    @Override
    protected void doServeResource(final ResourceRequest resourceRequest, final ResourceResponse resourceResponse) throws IOException {
        JSONSerializer jsonSerializer = JSONFactoryUtil.createJSONSerializer();
        JSONPortletResponseUtil.writeJSON(resourceRequest, resourceResponse, jsonSerializer.serializeDeep(getTranslations(resourceRequest)));
    }

    private Map<String, String> getTranslations(final ResourceRequest resourceRequest)  {
        String localeAsString = ParamUtil.getString(resourceRequest, "locale");
        Locale locale;
        if (localeAsString == null || localeAsString.isEmpty()) {
            locale = LocaleUtil.getDefault();
        } else {
            locale = Locale.forLanguageTag(localeAsString.replace('_', '-'));
        }
        ResourceBundle resourceBundle = getPortletConfig(resourceRequest).getResourceBundle(locale);
        return toMap(resourceBundle);
    }

    private static Map<String, String> toMap(final ResourceBundle resourceBundle) {
        Map<String, String> map = new HashMap<>();

        Enumeration<String> keys = resourceBundle.getKeys();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            map.put(key, resourceBundle.getString(key));
        }
        return map;
    }

    public static final Log LOGGER = LogFactoryUtil.getLog(PortletTranslationsResourceCommand.class);

}