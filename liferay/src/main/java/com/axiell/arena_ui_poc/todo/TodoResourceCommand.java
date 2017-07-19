package com.axiell.arena_ui_poc.todo;

import com.axiell.arena_ui_poc.AbstractArenaUIPortlet;
import com.axiell.arena_ui_poc.ArenaUIPortletKeys;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.portlet.JSONPortletResponseUtil;
import com.liferay.portal.kernel.portlet.bridges.mvc.BaseMVCResourceCommand;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCResourceCommand;
import com.liferay.portal.kernel.util.Constants;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.util.ParamUtil;
import org.osgi.service.component.annotations.Component;

import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;
import java.io.IOException;
import java.util.*;

@Component(
        property = {
                "javax.portlet.name=" + ArenaUIPortletKeys.TODO_PORTLET_NAME,
                "mvc.command.name=/portlet/translations"
        },
        service = MVCResourceCommand.class
)
public class TodoResourceCommand extends BaseMVCResourceCommand {


    @Override
    protected void doServeResource(ResourceRequest resourceRequest, ResourceResponse resourceResponse) throws Exception {
        final String cmd = ParamUtil.getString(resourceRequest, Constants.CMD);
        serveLanguageBundle(resourceRequest, resourceResponse);
    }

    private void serveLanguageBundle(final ResourceRequest resourceRequest, final ResourceResponse resourceResponse) throws IOException {
        Locale localeValue = LocaleUtil.getDefault();
        /*
		LOGGER.debug("Get language bundle for locale {}", locale);

		Locale localeValue = DEFAULT_LIFERAY_LOCALE;
		if (!Strings.isNullOrEmpty(locale)) {
			localeValue = Locale.forLanguageTag(locale);
		}
		*/
        ResourceBundle resourceBundle = getPortletConfig(resourceRequest).getResourceBundle(localeValue);
        //ResourceBundle resourceBundle = ResourceBundle.getBundle("Language",localeValue);
        Map<String, String> translations = toMap(resourceBundle);
        JSONPortletResponseUtil.writeJSON(resourceRequest, resourceResponse, translations);
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

    public static final Log LOGGER = LogFactoryUtil.getLog(AbstractArenaUIPortlet.class);


}