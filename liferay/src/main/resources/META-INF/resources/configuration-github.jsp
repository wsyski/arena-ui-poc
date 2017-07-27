<%@ page import="com.liferay.portal.kernel.util.Constants" %>

<%@ include file="./init.jsp" %>

<%@page	import="com.axiell.arena_ui_poc.github.GithubPortletConfiguration" %>

<%
	GithubPortletConfiguration portletConfiguration =
			(GithubPortletConfiguration)renderRequest.getAttribute(GithubPortletConfiguration.class.getName());

	String fontFamily = StringPool.BLANK;
	String fontColor = StringPool.BLANK;
	String fontSize = StringPool.BLANK;

	if (Validator.isNotNull(portletConfiguration)) {
		fontFamily = portletPreferences.getValue("fontFamily", portletConfiguration.fontFamily());
		fontColor = portletPreferences.getValue("fontColor", portletConfiguration.fontColor());
		fontSize = portletPreferences.getValue("fontSize",String.valueOf(portletConfiguration.fontSize()));
	}
%>

<liferay-portlet:actionURL portletConfiguration="<%= true %>"
	var="configurationActionURL"
/>

<liferay-portlet:renderURL portletConfiguration="<%= true %>"
	var="configurationRenderURL"
/>

<aui:form action="<%= configurationActionURL %>" method="post" name="fm">
	<aui:input name="<%= Constants.CMD %>" type="hidden"
		value="<%= Constants.UPDATE %>"
	/>

	<aui:input name="redirect" type="hidden"
		value="<%= configurationRenderURL %>"
	/>

	<aui:fieldset>
		<aui:select name="fontFamily" label="Font Family" value="<%= fontFamily %>">
			<aui:option value="Arial">Arial</aui:option>
			<aui:option value="Comic Sans MS">Comic Sans MS</aui:option>
			<aui:option value="Courier New">Courier New</aui:option>
			<aui:option value="Georgia">Georgia</aui:option>
			<aui:option value="Verdana">Verdana</aui:option>
		</aui:select>

		<aui:select label="Font Size" name="fontSize" value="<%= fontSize %>">
			<aui:option value="10">10</aui:option>
			<aui:option value="11">11</aui:option>
			<aui:option value="12">12</aui:option>
			<aui:option value="13">13</aui:option>
			<aui:option value="14">14</aui:option>
			<aui:option value="15">15</aui:option>
			<aui:option value="16">16</aui:option>
			<aui:option value="17">17</aui:option>
			<aui:option value="18">18</aui:option>
			<aui:option value="19">19</aui:option>
			<aui:option value="20">20</aui:option>
			<aui:option value="21">21</aui:option>
			<aui:option value="22">22</aui:option>
			<aui:option value="23">23</aui:option>
			<aui:option value="24">24</aui:option>
			<aui:option value="25">25</aui:option>
			<aui:option value="26">26</aui:option>
			<aui:option value="27">27</aui:option>
			<aui:option value="28">28</aui:option>
			<aui:option value="29">29</aui:option>
			<aui:option value="30">30</aui:option>
		</aui:select>

		<aui:select name="fontColor" label="Font Color"	value="<%= fontColor %>">
			<aui:option value="voilet">voilet</aui:option>
			<aui:option value="indigo">indigo</aui:option>
			<aui:option value="blue">blue</aui:option>
			<aui:option value="green">green</aui:option>
			<aui:option value="yellow">yellow</aui:option>
			<aui:option value="orange">orange</aui:option>
			<aui:option value="red">red</aui:option>
		</aui:select>
	</aui:fieldset>

	<aui:button-row>
		<aui:button type="submit"></aui:button>
	</aui:button-row>
</aui:form>