package com.axiell.arena_ui_poc.github;

import com.axiell.arena_ui_poc.ArenaUIPortletKeys;
import org.osgi.service.component.annotations.Component;

import javax.portlet.PortletPreferences;
import javax.portlet.PreferencesValidator;
import javax.portlet.ValidatorException;
import java.util.ArrayList;
import java.util.List;

@Component(
        immediate = true,
        property = {
                "javax.portlet.name=" + ArenaUIPortletKeys.GITHUB_PORTLET_NAME
        }
)
public class GithubPreferencesValidator
        implements PreferencesValidator {

    @Override
    public void validate(PortletPreferences portletPreferences)
            throws ValidatorException {

        List<String> invalidFontSizes = new ArrayList<>();

        String[] fontSizes = portletPreferences.getValues(
                "fontSize", new String[0]);

        for (String fontSize : fontSizes) {
            if (fontSize != null) {
                int fontSizeAsInt = Integer.parseInt(fontSize);
                if (fontSizeAsInt < 0) {
                    invalidFontSizes.add(fontSize);
                }
            }
        }

        if (!invalidFontSizes.isEmpty()) {
            throw new ValidatorException(
                    "Invalid fomt size", invalidFontSizes);
        }
    }

}